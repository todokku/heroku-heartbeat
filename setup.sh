#!/bin/bash

PORTABLE_BOILERPLATES=$(curl -s -X GET https://api.github.com/users/portable-boilerplates/repos)
MAPPED_PORTABLE_BOILERPLATES=$(echo "${PORTABLE_BOILERPLATES}" | jq 'map({ name: .name, clone_url: .clone_url })')
FILTERED_FRONTENDS=$(echo "${MAPPED_PORTABLE_BOILERPLATES}" | jq 'map(select(.name | contains("portable-frontend-boilerplate")))')
FILTERED_BACKENDS=$(echo "${MAPPED_PORTABLE_BOILERPLATES}" | jq 'map(select(.name | contains("portable-backend-boilerplate")))')
FRONTEND_CLONE_URL=
BACKEND_CLONE_URL=

function generate_line() {
  echo "--------------------------------------------------------"
}

function validate_boilerplates() {
  if [ "$(echo "${FILTERED_FRONTENDS}" | jq 'select(length == 0)')" ]; then
    echo "No frontend boilerplates found at https://github.com/portable-boilerplates"
    exit 1
  fi
  if [ "$(echo "${FILTERED_BACKENDS}" | jq 'select(length == 0)')" ]; then
    echo "No backend boilerplates found at https://github.com/portable-boilerplates"
    exit 1
  fi
}

function select_frontend() {
  generate_line
  PS3='Please select your frontend: '
  select fe_name in $(echo "${FILTERED_FRONTENDS}" | jq -r 'map(.name) | . |= . + ["None"] | .[]');
  do
    # Attempt to find matching frontend based on what user selects.
    FRONTEND_CLONE_URL=$(echo "${FILTERED_FRONTENDS}" | jq -r ".[] | select(.name == \"${fe_name}\").clone_url")
    [[ -n "${fe_name}" ]] && break || echo "Invalid option ${REPLY}"
  done
}

function select_backend() {
  generate_line
  PS3='Please select your backend: '
  select be_name in $(echo "${FILTERED_BACKENDS}" | jq -r 'map(.name) | . |= . + ["None"] | .[]');
  do
    # Attempt to find matching backend based on what user selects.
    BACKEND_CLONE_URL=$(echo "${FILTERED_BACKENDS}" | jq -r ".[] | select(.name == \"${be_name}\").clone_url")
    [[ -n "${be_name}" ]] && break || echo "Invalid option ${REPLY}"
  done
}

function confirm_selection() {
  generate_line
  echo "Selected frontend: ${fe_name}"
  echo "Selected backend: ${be_name}"
  PS3="Are you sure you want to use this stack?"$'\n'"Selecting 'Yes' will scaffold your project and this script will be deleted: "
  select option in "Yes" "No";
  do
    case "${option}" in
      Yes)
        break
        ;;
      No)
        start_wizard
        break
        ;;
      *)
        echo "Invalid option ${REPLY}"
        ;;
    esac
  done
  generate_line
}

function scaffold_project() {
  if [ -z "${FRONTEND_CLONE_URL}" ] && [ -z "${BACKEND_CLONE_URL}" ]; then
    echo "You must select at least 1 boilerplate!"
    exit 1
  else

     #### Scaffold fullstack.
     if [ -n "${FRONTEND_CLONE_URL}" ] && [ -n "${BACKEND_CLONE_URL}" ]; then

       # 1. Extract contents from `fullstack-template` to this directory then delete the empty folder.
       mv fullstack-template/* fullstack-template/.[^.]* . && rmdir fullstack-template/

       # 2. Remove remaining templates.
       rm -rf frontend-template
       rm -rf backend-template

       # 3. Clone frontend + backend and wipe their git histories.
       git clone "${FRONTEND_CLONE_URL}" client
       git clone "${BACKEND_CLONE_URL}" server
       rm -rf client/.git
       rm -rf server/.git
     fi

     ### Scaffold frontend.
     if [ -n "${FRONTEND_CLONE_URL}" ] && [ -z "${BACKEND_CLONE_URL}" ]; then

       # 1. Extract contents from `frontend-template` to this directory then delete the empty folder.
       mv frontend-template/* frontend-template/.[^.]* . && rmdir frontend-template/

       # 2. Remove remaining templates.
       rm -rf backend-template
       rm -rf fullstack-template

       # 3. Clone frontend and wipe its git history.
       git clone "${FRONTEND_CLONE_URL}" app
       rm -rf app/.git
     fi

     ### Scaffold backend.
     if [ -n "${BACKEND_CLONE_URL}" ] && [ -z "${FRONTEND_CLONE_URL}" ]; then

       # 1. Extract contents from `backend-template` to this directory then delete the empty folder.
       mv backend-template/* backend-template/.[^.]* . && rmdir backend-template/

       # 2. Remove remaining templates.
       rm -rf frontend-template
       rm -rf fullstack-template

       # 3. Clone backend and wipe its git history.
       git clone "${BACKEND_CLONE_URL}" app
       rm -rf app/.git
     fi

     ### Self destruct.
     rm -- "$0"
  fi
}

function blast_off() {
  cat << "EOF"
     __
     \ \_____
  ###[==_____>
     /_/              __
                      \ \_____
                   ###[==_____>
                      /_/
   ____  _           _            __  __ _
  | __ )| | __ _ ___| |_    ___  / _|/ _| |
  |  _ \| |/ _` / __| __|  / _ \| |_| |_| |
  | |_) | | (_| \__ \ |_  | (_) |  _|  _|_|
  |____/|_|\__,_|___/\__|  \___/|_| |_| (_)
EOF
}

function start_wizard() {
  validate_boilerplates
  select_frontend
  select_backend
  confirm_selection
  scaffold_project
  blast_off
}

start_wizard

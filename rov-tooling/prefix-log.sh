#!/usr/bin/env bash

# Script to prefix all output with the process name in the supervisord process manager
# Source:https://serverfault.com/questions/754970/how-to-add-a-prefix-label-for-services-to-supervisor-stdout-output

# setup fd-3 to point to the original stdout
exec 3>&1
# setup fd-4 to point to the original stderr
exec 4>&2

# get the prefix from SUPERVISOR_PROCESS_NAME environement variable
printf -v PREFIX "%-10.10s" ${SUPERVISOR_PROCESS_NAME}

# reassign stdout and stderr to a preprocessed and redirected to the original stdout/stderr (3 and 4) we have create eralier
exec 1> >( perl -ne '$| = 1; print "'"${PREFIX}"' | $_"' >&3)
exec 2> >( perl -ne '$| = 1; print "'"${PREFIX}"' | $_"' >&4)

# from here on everthing that outputs to stdout/stderr will be go through the perl script
exec "$@"

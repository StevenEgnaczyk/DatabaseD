#!/bin/sh
branch="$(git rev-parse --abbrev-ref HEAD)"
if [ "$branch" = "main" ]; then
  echo "You are trying to push to the 'main' branch. Please switch to a different branch."
  exit 1
fi
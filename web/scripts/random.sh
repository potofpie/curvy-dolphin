#!/bin/sh

RAND=$(openssl rand -hex 12)
echo "{\"randomString\": \"$RAND\"}" > ./src/random.json
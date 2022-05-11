#!/bin/bash
qrencode "exp://$(/sbin/ip route|awk '/default/ { print $3 }'):19000" -o - -t utf8;

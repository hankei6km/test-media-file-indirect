#!/bin/bash

  curl "https://test-media-file-indirect.microcms.io/api/v1/media?limit=10000" -s -H "X-API-KEY:${GET_API_KEY}" > lib/\$items.json
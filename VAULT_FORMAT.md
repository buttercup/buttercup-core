# Vault Format

Buttercup uses special format _vaults_ to store secret groups and entries. This document details the active vault formats that Buttercup uses in its current software.

## Format B

> ? -> Current

The second format, utilising a JSON structure for vault data:

```json
{
    "id": "fb31b4a6-1e54-4460-ae03-5441a8083be5",
    "a": {},
    "g": [
        {
            "id": "c5f76882-6d5d-4348-b3fd-222608670af0",
            "t": "General",
            "a": {},
            "g": "0"
        },
        {
            "id": "e494bd0a-4c91-48c0-85c7-59ff8387dd87",
            "t": "Websites",
            "a": {},
            "g": "c5f76882-6d5d-4348-b3fd-222608670af0"
        }
    ],
    "e": [
        {
            "id": "9f051bef-e6c5-4b85-a135-5ff7ddfc4cb2",
            "g": "e494bd0a-4c91-48c0-85c7-59ff8387dd87",
            "a": {},
            "p": {
                "title": "My Entry",
                "username": "user@test.com",
                "password": "passw0rd"
            }
        }
    ]
}
```

## Format A

> September 2015 -> 2020

The first format for Butttercup vaults. Uses a line-by-line delta structure to _modify_ the vault. Supported step-by-step updates to the vault.


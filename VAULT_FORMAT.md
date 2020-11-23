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
                "title": {
                    "value": "My Entry",
                    "created": 1598298143533,
                    "updated": 1598298143533,
                    "history": []
                },
                "username": {
                    "value": "user@test.com",
                    "created": 1598298178114,
                    "updated": 1598298178114,
                    "history": []
                },
                "password": {
                    "value": "passw0rd",
                    "created": 1598298153538,
                    "updated": 1598298178114,
                    "history": [
                        {
                            "value": "old-password",
                            "updated": 1598298177010
                        }
                    ]
                },
                "deleted item": {
                    "value": "some value",
                    "created": 1598298362682,
                    "updated": 1598298362682,
                    "deleted": 1598298411608,
                    "history": []
                }
            }
        }
    ],
    "c": "2020-08-24T19:40:12.609Z"
}
```

Format B vaults can additionally include **shares**, delivered by the My Buttercup service during unlocking. Shares will be included under the property `s`:

```json
{
    "id": "fb31b4a6-1e54-4460-ae03-5441a8083be5",
    "a": {},
    "g": [],
    "e": [],
    "s": [
        {
            "id": "d5c7fba4-b8f4-45a3-9c2b-3d61ca9beb29",
            "g": [],
            "e": []
        }
    ]
}
```

Shares are simply containers for groups and entries that are merged with vaults when unlocked.

## Format A

> September 2015 -> 2020

The first format for Butttercup vaults. Uses a line-by-line delta structure to _modify_ the vault. Supported step-by-step updates to the vault.:

```
aid df553df1-9096-4e97-b321-5cda5a761922
cmm "Buttercup archive created (2017-1-7)"
fmt "buttercup/a"
cgr 0 ddb5bed5-00d5-4b5d-96a2-1a36511ac538
tgr ddb5bed5-00d5-4b5d-96a2-1a36511ac538 "test-group-main"
pad 6b78b1bc-66f9-4f67-ac9b-92862c8bb1f7
cen ddb5bed5-00d5-4b5d-96a2-1a36511ac538 ce86c59b-0290-476a-8121-8a6e5381c528
sep ce86c59b-0290-476a-8121-8a6e5381c528 title "test-entry-main"
pad 46fb579e-561f-434c-a9f3-7464f49f63a9
sep ce86c59b-0290-476a-8121-8a6e5381c528 username "user123\\@test.@D"
pad 4da334e8-c9e5-464d-9a91-393188972bbb
sep ce86c59b-0290-476a-8121-8a6e5381c528 password "* \u0002\u0006\u0000\u0003\u0007\u0004\u0006\u0000͡! "
pad 764cad08-2bc8-4ea3-a728-f38ac9aa2f78
sem ce86c59b-0290-476a-8121-8a6e5381c528 "test-meta" "test-value 8"
pad a1673764-c34b-481e-ae73-b09a56f85ba6
```

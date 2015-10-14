# Buttercup core library

A NodeJS password vault.

## This library

This repository holds the core system functionality:

 - Archive reading/writing
 - Encryption/decryption
 - Low-level processing and manipulation
 - Archive format handling
 
## About

Buttercup manages credentials in an encrypted archive. The archive utilises a delta-based (history) archive description method to load and save data. This allows for more robust saving and loading whilst protecting against external file changes by allowing some degree of merging.

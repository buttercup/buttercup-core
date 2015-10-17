# Buttercup core library

A NodeJS password vault.

[![npm version](https://badge.fury.io/js/buttercup.svg)](https://badge.fury.io/js/buttercup) [![security](https://img.shields.io/badge/Security-As%20you%20wish-green.svg)](https://www.npmjs.com/package/buttercup) [![Build Status](https://travis-ci.org/perry-mitchell/buttercup-core.svg?branch=master)](https://travis-ci.org/perry-mitchell/buttercup-core)

[![NPM](https://nodei.co/npm/buttercup.png?downloads=true&stars=true)](https://nodei.co/npm/buttercup/)

## This library

This repository holds the core system functionality:

 - Archive reading/writing
 - Encryption/decryption
 - Low-level processing and manipulation
 - Archive format handling
 
## About

Buttercup manages credentials in an encrypted archive. The archive utilises a delta-based (history) archive description method to load and save data. This allows for more robust saving and loading whilst protecting against external file changes by allowing some degree of merging.

## Features

 - AES 256 bit GCM encryption
 - Archive change delta tracking
 - WebDAV remote file support


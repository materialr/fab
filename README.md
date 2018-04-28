# MaterialR Fab

**@materialr/fab**

[![Build Status](https://travis-ci.org/materialr/fab.svg?branch=master)](https://travis-ci.org/materialr/fab)
[![Coverage Status](https://coveralls.io/repos/github/materialr/fab/badge.svg?branch=master)](https://coveralls.io/github/materialr/fab?branch=master)
[![NSP Status](https://nodesecurity.io/orgs/materialr/projects/cfce9935-beb5-4bae-8be9-a5a78696864c/badge)](https://nodesecurity.io/orgs/materialr/projects/cfce9935-beb5-4bae-8be9-a5a78696864c)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Material FAB implementation for React

## Installation

```sh
$ npm install --save @materialr/fab
```

## Demo

A full demo is available on the [MaterialR website](https://materialr.github.io/components/fab)
showcasing all variants.

## Components

### Default export

```js
import Fab from '@materialr/fab';
```

| Prop        | Type   | Required | Default   | Description                                 |
| ----------- | ------ | -------- | --------- | ------------------------------------------- |
| `className` | string | No       | undefined | Additional classNames to add                |
| `exited`    | bool   | No       | false     | Whether the fab has the exiting style       |
| `icon`      | string | Yes      | N/A       | The material icon to render                 |
| `mini`      | bool   | No       | false     | Whether the fab has the mini style          |
| `onClick`   | func   | No       | undefined | The click handler method                    |
| `ripple`    | bool   | No       | false     | Whether a ripple should be added to the fab |

<div align="center">
  <img src="https://uploads-ssl.webflow.com/5ebcfb1b1d09c98536625cfa/5ebcfc18b0234783b401f5c9_logo%20caast%20site%404x.png" width="500" alt="caast.tv" />
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/@caast/react-use-caast">
    <img alt="npm" src="https://img.shields.io/npm/v/@caast/react-use-caast.svg?labelColor=49516F&color=8994BC" />
  </a>
  <a href="https://bundlephobia.com/result?p=@caast/react-use-caast">
    <img alt="tree-shakeable" src="https://badgen.net/bundlephobia/tree-shaking/@caast/react-use-caast?labelColor=49516F&color=8994BC" />
  </a>
  <a href="https://www.npmjs.com/package/@caast/react-use-caast">
    <img alt="types included" src="https://badgen.net/npm/types/@caast/react-use-caast?labelColor=49516F&color=8994BC" />
  </a>
</div>

## Install

```sh
yarn add @caast/react-use-caast
# or
npm i @caast/react-use-caast --save
```

## Description

This hook allow you to simply implement Caast library on a React project. It will inject the library in your DOM with your provided API keys. The caast instance will then be available in order to perform the available actions of the library.

## Usage

```javascript
import React, { useState, useEffect } from 'react';
import useCaast from '@caast/react-use-caast';

export default function App() {
  const caastInstance = useCaast({ app_id: 'MY_APP_ID', app_key: 'MY_APP_KEY' });

  useEffect(() => {
    if (caastInstance) {
      console.log('Caast is now loaded, you can now call Caast library methods', caastInstance.infos());
    }
  }, [caastInstance]);
}
```

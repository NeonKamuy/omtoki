
import React, { useEffect, useState } from 'react';
import UserController from '../../controllers/users';
import { IIndexedUser } from '../../shared/interfaces/user';
import { Content } from '../content';
import { Header } from '../header';

const App = () => {
  return (
    <div>
      <Header />
      <Content />
    </div>
  );
};

export default App;

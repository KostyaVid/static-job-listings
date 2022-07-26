import React from 'react';
import s from './Container.module.scss';
interface IContainerPostProps {
  children: React.ReactNode;
  featured: boolean;
}

const ContainerPost = ({ children, featured }: IContainerPostProps) => {
  return (
    <div className={s.container}>
      {featured && <div className={s.borderLeft}></div>}
      {children}
    </div>
  );
};

export default ContainerPost;

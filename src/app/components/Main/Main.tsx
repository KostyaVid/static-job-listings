import axios from 'axios';
import { useEffect, useState } from 'react';
import ContainerPost from '../ContainerPost/ContainerPost';
import Filter from '../Filter/Filter';
import Post from '../Post/Post';
import s from './Main.module.scss';

export interface IPost {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: Array<string>;
  tools: Array<string>;
}

const Main = () => {
  const [posts, setPosts] = useState<Array<IPost> | undefined>(undefined);
  const [filter, setFilter] = useState<Array<string>>([]);
  const [filterPosts, setFilterPosts] = useState<Array<number>>([]);

  function isIncludesFilter(filterArg: string, postArg: IPost) {
    if (postArg.position === filterArg) return true;
    if (postArg.role === filterArg) return true;
    if (postArg.level === filterArg) return true;
    if (postArg.languages.includes(filterArg)) return true;
    if (postArg.tools.includes(filterArg)) return true;
    return false;
  }

  const filterRecursion: (indexArray: number[], indexFilter: number) => number[] = (
    indexArray: number[],
    indexFilter: number,
  ) => {
    let arr: number[] = [];
    if (posts) {
      for (let i = 0; i < indexArray.length; i++) {
        if (isIncludesFilter(filter[indexFilter], posts[indexArray[i]])) arr.push(indexArray[i]);
      }
    }

    if (indexFilter === filter.length - 1) return arr;
    return filterRecursion(arr, indexFilter + 1);
  };

  useEffect(() => {
    let arrFilter: number[] = [];
    if (posts) {
      for (let i = 0; i < posts.length; i++) {
        arrFilter.push(i);
      }
      if (filter.length > 0) {
        setFilterPosts(filterRecursion(arrFilter, 0));
      } else {
        setFilterPosts(arrFilter);
      }
    } else {
      setFilterPosts(arrFilter);
    }
  }, [filter, posts]);

  useEffect(() => {
    axios.get('./data.json').then((res) => setPosts(res.data));
  }, []);

  function clearFilter() {
    setFilter([]);
  }

  function deleteFilterByIndex(filterID: number) {
    let arrFilter = [...filter];
    arrFilter.splice(filterID, 1);
    setFilter(arrFilter);
  }

  function addFilter(filterArg: string) {
    if (!filter.includes(filterArg)) setFilter([...filter, filterArg]);
  }

  if (posts) {
    return (
      <main className={s.main}>
        <Filter filters={filter} onClear={clearFilter} deleteFilterByIndex={deleteFilterByIndex} />
        {filterPosts.map((postIndex) => (
          <ContainerPost featured={false} key={posts[postIndex].id}>
            <Post post={posts[postIndex]} addFilter={addFilter} />
          </ContainerPost>
        ))}
      </main>
    );
  } else {
    return (
      <main className={s.main}>
        <ContainerPost featured={false}>Loading...</ContainerPost>
      </main>
    );
  }
};

export default Main;

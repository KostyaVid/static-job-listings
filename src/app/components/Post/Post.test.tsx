import React from 'react';
import { render, screen } from '@testing-library/react';
import Post from './Post';
import { IPost } from '../Main/Main';

describe('Post', () => {
  const post: IPost = {
    id: 9,
    company: 'Eyecam Co.',
    logo: './images/eyecam-co.svg',
    new: false,
    featured: false,
    position: 'Full Stack Engineer',
    role: 'Fullstack',
    level: 'Midweight',
    postedAt: '3w ago',
    contract: 'Full Time',
    location: 'Worldwide',
    languages: ['JavaScript', 'Python'],
    tools: ['Django'],
  };

  it('render tags languages', () => {
    render(<Post post={post} addFilter={() => {}} />);
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('render tags tools', () => {
    render(<Post post={post} addFilter={() => {}} />);
    expect(screen.getByText('Django')).toBeInTheDocument();
  });
});

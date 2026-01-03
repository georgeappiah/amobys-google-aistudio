
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  location: string;
}

export interface NavItem {
  label: string;
  href: string;
}

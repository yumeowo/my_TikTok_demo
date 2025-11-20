import { Helmet } from '@modern-js/runtime/head';
import './index.css';

const Index = () => (
  <>
    <Helmet>
      <title>My TikTok Demo</title>
    </Helmet>
    <div className="container">
      <h1>Welcome to My TikTok Demo</h1>
      <p>This is a simple demo application built with Modern.js.</p>
    </div>
  </>
);

export default Index;

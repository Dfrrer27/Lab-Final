import { useParams } from 'react-router-dom';
import PostList from '../components/PostList';
import CategoriaList from '../components/CategoriaList';

const CategoriaPage = () => {
  const { nombre } = useParams();

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Publicaciones de la categoría: {nombre}</h2>
      <div className="row">
        <div className="col-lg-8">
          <PostList categoriaNombre={nombre} />
        </div>
        <div className="col-lg-4">
          <CategoriaList />
        </div>
      </div>
    </div>
  );
};

export default CategoriaPage;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CategoriaList = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:8000/canva/categorias/');
        if (!response.ok) {
          throw new Error('Error al obtener las categorías');
        }
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <div className="card mb-4">
      <div className="card-header">Categorías</div>
      <div className="card-body">
        <ul className="list-group">
          {categorias.map(categoria => (
            <li key={categoria.id} className="list-group-item">
              <Link to={`/categoria/${categoria.nombre}`}>{categoria.nombre}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoriaList;
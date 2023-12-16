import { useState, useEffect } from 'react';
import CategoriaList from '../components/CategoriaList';
import PostList from '../components/PostList';

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handlePublishPost = async () => {
    try {
      const postTitle = document.getElementById('postTitle').value;
      const postDescription = document.getElementById('postDescription').value;
      const postCategory = document.getElementById('postCategory').value;

      if (!postTitle || !postDescription || !postCategory) {
        alert('Por favor, complete todos los campos.');
        return;
      }

      const postData = {
        titulo: postTitle,
        descripcion: postDescription,
        categoria: postCategory,
      };

      const response = await fetch('http://localhost:8000/canva/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Error al publicar el post.');
      }

      document.getElementById('postTitle').value = '';
      document.getElementById('postDescription').value = '';
      document.getElementById('postCategory').value = '';

      handleModalClose();
    } catch (error) {
      console.error('Error al publicar el post:', error.message);
    }
  };

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
    <div>
      {/* Page header with logo and tagline*/}
      <header className="py-5 bg-light border-bottom mb-4">
            <div className="container">
                <div className="text-center my-5">
                    <h1 className="fw-bolder">Bienvenido a mi blog</h1>
                </div>
            </div>
      </header>
      {/* CABECERA */}

      {/* CONTENIDO */}
      <div className="container">
        <div className="row">
          {/* Blog entries*/}
          <div className="col-lg-8">
            <PostList />
          </div>
          <div className="col-lg-4">
            <CategoriaList />
            <div>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={handleModalOpen}
              >
                Publica Algo!
              </button>
            </div>
            <div className={`modal fade ${modalOpen ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: modalOpen ? 'block' : 'none' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Publicar Nuevo Post</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="postTitle" className="form-label">Título:</label>
                        <input type="text" className="form-control" id="postTitle" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="postDescription" className="form-label">Descripción:</label>
                        <textarea className="form-control" id="postDescription" rows="3"></textarea>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="postCategory" className="form-label">Categoría:</label>
                        <select className="form-select" id="postCategory">
                          {categorias.map(categoria => (
                            <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                          ))}
                        </select>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleModalClose}>Cancelar</button>
                    <button type="button" className="btn btn-primary" onClick={handlePublishPost}>Publicar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CONTENIDO */}

      {/* PIE DE PAGINA */}
      <footer className="py-5 bg-dark">
        <div className="container"><p className="m-0 text-center text-white">Copyright &copy; Your Website 2022</p></div>
      </footer>
      {/* PIE DE PAGINA */}
    </div>
  )
}

export default HomePage
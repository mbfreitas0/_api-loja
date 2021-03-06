    const mysql = require('../mysql');

 exports.getProducts = async (req, res, next) => {
     const query = `SELECT * FROM produtos`;
        const result = await mysql.execute(query, [
            req.query.id
        ])
        const response = {
            length: result.length,
            produtos: result.map(prod => {
                
                    return {
                    id: prod.id,
                    //id_grupo: prod.id_grupo,
                    //id_marca: prod.id_marca,
                    //id_locacao: prod.id_locacao,
                    status: prod.status,
                    descricao: prod.descricao,
                    estoque_min: prod.estoque_min,
                    estoque_max: prod.estoque_max,
                    
                }
            })
        }
       
        return  res.status(200).send(response);
                
       
    };
   
exports.postProduct = async (req, res, next) => {
    
    try {
        const query = 'INSERT INTO produtos ( status, descricao, estoque_min, estoque_max ) VALUES (?,?,?,?)';
        const result = await mysql.execute(query, [
            //req.body.id_grupo,
            //req.body.id_marca,
            //req.body.id_locacao,
            req.body.status,
            req.body.descricao,
            req.body.estoque_min,
            req.body.estoque_max,
            
        ]);

        const response = {
            message: 'Produto inserido com sucesso',
            createdProduct: {
                id: result.insertId,
                //id_grupo:req.body.id_grupo,
                //id_marca:req.body.id_marca,
                //id_locacao:req.body.id_locacao,
                status:req.body.status,
                descricao:req.body.descricao,
                estoque_min:req.body.estoque_min,
                estoque_max:req.body.estoque_max,
                              
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.getProductDetail = async (req, res, next)=> {
   /*  const id = parseInt(req.params.id);
    const response = await mysql.execute('SELECT * FROM produtos WHERE id = $1', [id]);
    res.status(200).send(response.rows); */
    try {
        const query = 'SELECT * FROM produtos WHERE id = ?';
        const result = await mysql.execute(query, [req.params.id]);

        if (result.length == 0) {
            return res.status(404).send({
                message: 'N??o foi encontrado produto com este ID'
            })
        }
        const response = {
            product: {
                id: result[0].id,
                //id_grupo: result[0].id_grupo,
                //id_marca: result[0].id_marca,
                //id_locacao: result[0].id_locacao,
                status: result[0].status,
                descricao: result[0].descricao,
                estoque_min: result[0].estoque_min,
                estoque_max: result[0].estoque_max,
            }
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.updateProduct = async (req, res, next) => {
   
    try {
        const query = ` UPDATE produtos
                           SET status       = ?,
                               descricao    = ?,
                               estoque_min  = ?,
                               estoque_max  = ? 
                            WHERE id        = ?`;
        await mysql.execute(query, [
            //req.body.id_grupo,
            //req.body.id_marca,
            //req.body.id_locacao,
            req.body.status,
            req.body.descricao,
            req.body.estoque_min,
            req.body.estoque_max,
            req.params.id
        ]);
        const response = {
            message: 'Produto atualizado com sucesso',
            upatedProduct: {
                id: req.params.id,
                //id_grupo:req.body.id_grupo,
                //id_marca:req.body.id_marca,
                //id_locacao:req.body.id_locacao,
                status:req.body.status,
                descricao:req.body.descricao,
                estoque_min:req.body.estoque_min,
                estoque_max:req.body.estoque_max,
                
            }
        }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.deleteProduct = async (req, res, next) => {
   /*  const id = parseInt(req.params.id);
    await mysql.execute('DELETE FROM produtos WHERE id = $1', [id]);
    res.status(200).send({message:'Product deleted successfully !  ', id}); */

    try {
        const query = `DELETE FROM produtos WHERE id = ?`;
        await mysql.execute(query, [req.params.id]);

        const response = {
            message: 'Produto removido com sucesso',
            request: {
                
                body: {
                    //id_grupo: 'Number',
                    //id_marca: 'Number',
                    //id_locacao:'Number',
                    status: 'String',
                    descricao: 'String',
                    estoque_min: 'Number',
                    estoque_max: 'Number',
                }
            }
        }
        return res.status(202).send(response);

    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

/* exports.postImage = async (req, res, next) => {
    try {
        const query = 'INSERT INTO productImages (productId, path) VALUES (?,?)';
        const result = await mysql.execute(query, [
            req.params.productId,
            req.file.path
        ]);

        const response = {
            message: 'Imagem inserida com sucesso',
            createdImage: {
                productId: parseInt(req.params.productId),
                imageId: result.insertId,
                path: req.file.path,
                request: {
                    type: 'GET',
                    description: 'Retorna todos as imagens',
                    url: process.env.URL_API + 'produtos/' + req.params.productId + '/imagens'
                }
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.getImages = async (req, res, next) => {
    try {
        const query  = "SELECT * FROM productImages WHERE productId = ?;"
        const result = await mysql.execute(query, [req.params.productId])
        const response = {
            length: result.length,
            images: result.map(img => {
                return {
                    productId: parseInt(req.params.productId),
                    imageId: img.imageId,
                    path: process.env.URL_API + img.path
                }
            })
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}; */
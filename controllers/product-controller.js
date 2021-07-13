const mysql = require('../mysql');

exports.getProdutos = async (req, res, next) => {
    try {
        let descricao = '';
        if (req.query.descricao) {
            descricao = req.query.descricao;    
        }
    
        const query = `
            SELECT * FROM produtos`;
        const result = await mysql.execute(query, [
            req.query.categoryId
        ])
        const response = {
            length: result.length,
            produtos: result.map(prod => {
                return {
                    id: prod.id,
                    id_grupo: prod.id_grupo,
                    id_marca: prod.id_marca.id_marca,
                    id_locacao: prod.id_locacao,
                    status: prod.status,
                    descricao: prod.descricao,
                    estoque_min: prod.estoque_min,
                    estoque_max: prod.estoque_max,
                    
                    request: {
                        type: 'GET',
                        description: 'Retorna os detalhes de um produto específico',
                        url: process.env.URL_API + 'produtos/' + prod.id
                    }
                }
            })
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.postProduct = async (req, res, next) => {
    try {
        const query = 'INSERT INTO produtos ( id_grupo, id_marca, id_locacao, status, descricao, estoque_min, estoque_max ) VALUES (?,?,?,?,?,?,?)';
        const result = await mysql.execute(query, [
            req.body.id_grupo,
            req.body.id_marca,
            req.body.id_locacao,
            req.body.status,
            req.body.descricao,
            req.body.estoque_min,
            req.body.estoque_max,
            
        ]);

        const response = {
            message: 'Produto inserido com sucesso',
            createdProduct: {
                id: result.insertId,
                req.body.id_grupo,
                req.body.id_marca,
                req.body.id_locacao,
                req.body.status,
                req.body.descricao,
                req.body.estoque_min,
                req.body.estoque_max,
               
                request: {
                    type: 'GET',
                    description: 'Retorna todos os produtos',
                    url: process.env.URL_API + 'produtos'
                }
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.getProductDetail = async (req, res, next)=> {
    try {
        const query = 'SELECT * FROM produtos WHERE productId = ?;';
        const result = await mysql.execute(query, [req.params.productId]);

        if (result.length == 0) {
            return res.status(404).send({
                message: 'Não foi encontrado produto com este ID'
            })
        }
        const response = {
            product: {
                productId: result[0].productId,
                descricao: result[0].descricao,
                price: result[0].price,
                productImage: result[0].productImage,
                request: {
                    type: 'GET',
                    description: 'Retorna todos os produtos',
                    url: process.env.URL_API + 'produtos'
                }
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
                           SET descricao         = ?,
                               price        = ?
                         WHERE productId    = ?`;
        await mysql.execute(query, [
            req.body.descricao,
            req.body.price,
            req.params.productId
        ]);
        const response = {
            message: 'Produto atualizado com sucesso',
            upatedProduct: {
                productId: req.params.productId,
                descricao: req.body.descricao,
                price: req.body.price,
                request: {
                    type: 'GET',
                    description: 'Retorna os detalhes de um produto específico',
                    url: process.env.URL_API + 'produtos/' + req.params.productId
                }
            }
        }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const query = `DELETE FROM produtos WHERE productId = ?`;
        await mysql.execute(query, [req.params.productId]);

        const response = {
            message: 'Produto removido com sucesso',
            request: {
                type: 'POST',
                description: 'Insere um produto',
                url: process.env.URL_API + 'produtos',
                body: {
                    descricao: 'String',
                    price: 'Number'
                }
            }
        }
        return res.status(202).send(response);

    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.postImage = async (req, res, next) => {
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
};
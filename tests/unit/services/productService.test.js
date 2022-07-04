const sinon = require('sinon');
const productModel = require('../../../models/productModel');
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');
const productService = require('../../../services/productService');

chai.use(chaiAsPromised);

describe('productService', () => {
  beforeEach(sinon.restore);

  describe('getAll', () => {
    it('deve disparar um erro caso ProductModel.getAllProducts, disparar um erro', () => {
      sinon.stub(productModel, 'getAllProducts').rejects();
      return chai.expect(productService.getAll()).to.eventually.be.rejected;
    });
    it('deve retornar uma lista caso ProductModel.getAllProducts retorne', () => {
      sinon.stub(productModel, 'getAllProducts').resolves([]);
      return chai.expect(productService.getAll()).to.eventually.be.a('array');
    });
  });

  describe('getById', () => {
    it('deve disparar um erro caso ProductModel.getProductById, disparar um erro', () => {
      sinon.stub(productModel, 'getProductById').rejects();
      return chai.expect(productService.getById(1)).to.eventually.be.rejected;
    });
    it('deve retornar uma lista caso ProductModel.getProductById retorne', () => {
      sinon.stub(productModel, 'getProductById').resolves({});
      return chai
        .expect(productService.getById(1))
        .to.eventually.deep.equal({});
    });
  });

  describe('checkIfExists', () => {
    it('deve disparar um erro caso ProductModel.exists, disparar um erro', () => {
      sinon.stub(productModel, 'exists').rejects();
      return chai.expect(productService.checkIfExists(1)).to.eventually.be
        .rejected;
    });
    it('deve retornar um numero caso ProductModel.exists retorne', () => {
      sinon.stub(productModel, 'exists').resolves(true);
      return chai.expect(productService.checkIfExists(1)).to.eventually
        .undefined;
    });
  });
});

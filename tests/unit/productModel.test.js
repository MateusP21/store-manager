const sinon = require('sinon');
const productModel = require('../../models/productModel');
const db = require('../../models/db');
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');

chai.use(chaiAsPromised);

const mockProducts = [
  {
    id: 1,
    name: 'any_name',
  },
  { id: 2, name: 'any_name' },
  { id: 3, name: 'any_name' },
];

describe('productModel', () => {
  beforeEach(sinon.restore);
  describe('getAllProducts', () => {
    it('quando chamado espera que se retorne uma lista', () => {
      sinon.stub(db, 'query').resolves(mockProducts);
      return chai
        .expect(productModel.getAllProducts())
        .to.eventually.be.a('array');
    });

    it('dispare um erro se o banco disparar um erro', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(productModel.getAllProducts()).to.eventually.be
        .rejected;
    });
  });

  describe('getProductById', () => {
    it('quando chamado espera que se retorne um objeto', () => {
      sinon.stub(db, 'query').resolves(mockProducts[0]);
      return chai
        .expect(productModel.getProductById(1))
        .to.eventually.be.a('object');
    });

    it('espera se que o objeto possua um id', () => {
      sinon.stub(db, 'query').resolves(mockProducts[0]);
      return chai
        .expect(productModel.getProductById(1))
        .to.eventually.have.property('id');
    });
  });

  describe('exists', () => {
    it('quando chamado espera que se retorne um numero', () => {
      sinon.stub(db, 'query').resolves(1);
      return chai.expect(productModel.exists(0)).to.eventually.be.a('number');
    });
  });
});

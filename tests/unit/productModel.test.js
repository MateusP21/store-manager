const sinon = require('sinon');
const productModel = require('../../models/productModel');
const db = require('../../models/db');
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');

chai.use(chaiAsPromised);

describe('productModel', () => {
  beforeEach(sinon.restore);
  describe('getAllProducts', () => {
    it('quando chamado espera que se retorne uma lista', async () => {
      sinon.stub(db, 'query').resolves([]);
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
});

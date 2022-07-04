const sinon = require('sinon');
const mockProducts = require('../../mock/productMock');
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');
const productService = require('../../../services/productService');
const productController = require('../../../controllers/productController');

chai.use(chaiAsPromised);

describe('productController', () => {
  beforeEach(sinon.restore);

  describe('getAll', () => {
    it('deve disparar um erro caso productService.getAll, disparar um erro', () => {
      sinon.stub(productService, 'getAll').rejects();
      return chai.expect(productController.getAll()).to.eventually.be.rejected;
    });
    it('deve chamar o res.status com 200 e o res.json', async () => {
      const status = sinon.stub().callsFake(() => res);
      const json = sinon.stub().returns();
      const res = { status, json };
      sinon.stub(productService, 'getAll').resolves([mockProducts]);
      await productController.getAll({}, res);

      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal(mockProducts);
    });
  });

  describe('getById', () => {
    it('deve disparar um erro caso productService.getById, disparar um erro', () => {
      sinon.stub(productService, 'getById').rejects();
      return chai.expect(productService.getById(1)).to.eventually.be.rejected;
    });

    it('deve chamar o res.status com 200 e o res.json, quando passado o parametro', async () => {
      const req = { params: { id: 1 } };
      const status = sinon.stub().callsFake(() => res);
      const json = sinon.stub().returns();
      const res = { status, json };
      sinon.stub(productService, 'getById').resolves([mockProducts]);
      await productController.getById(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.equal(mockProducts[0]);
    });
  });
});

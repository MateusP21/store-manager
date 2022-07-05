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
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      sinon.stub(productService, 'getAll').resolves([]);
      await productController.getAll({}, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      return chai.expect(res.json.getCall(0).args[0]).to.deep.equal([]);
    });
  });

  describe('getById', () => {
    it('deve disparar um erro caso productService.validateParamsId dispare', () => {
      sinon.stub(productService, 'validateParamsId').rejects({});
      return chai.expect(productController.getById({}, {})).to.eventually.be
        .rejected;
    });
    it('deve disparar um erro caso productService.checkIfExists dispare', () => {
      sinon.stub(productService, 'validateParamsId').resolves({});
      sinon.stub(productService, 'checkIfExists').rejects({});
      return chai.expect(productController.getById({}, {})).to.eventually.be
        .rejected;
    });
    it('deve disparar um erro caso productService.getById, disparar um erro', () => {
      sinon.stub(productService, 'validateParamsId').resolves({});
      sinon.stub(productService, 'checkIfExists').resolves({});
      sinon.stub(productService, 'getById').rejects();
      return chai.expect(productController.getById({}, {})).to.eventually.be
        .rejected;
    });

    it('deve chamar o res.status com 200 e o res.json', async () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'checkIfExists').resolves();
      sinon.stub(productService, 'getById').resolves([]);
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      await productController.getById({ params: { id: 1 } }, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal([]);
    });
  });

  describe('editProduct', () => {
    it('deve disparar um erro caso productService.validateParamsId dispare', () => {
      sinon.stub(productService, 'validateParamsId').rejects({});
      return chai.expect(productController.editProduct({}, {})).to.eventually.be
        .rejected;
    });
    it('deve disparar um erro caso productService.checkIfExists dispare', () => {
      sinon.stub(productService, 'validateParamsId').resolves({});
      sinon.stub(productService, 'checkIfExists').rejects({});
      return chai.expect(productController.editProduct({}, {})).to.eventually.be
        .rejected;
    });

    it('deve disparar um erro caso productService.validateBodyAdd dispare', () => {
      sinon.stub(productService, 'validateParamsId').resolves({});
      sinon.stub(productService, 'checkIfExists').resolves({});
      sinon.stub(productService, 'validateBodyAdd').rejects({});
      return chai.expect(productController.editProduct({}, {})).to.eventually.be
        .rejected;
    });

    it('deve disparar um erro caso productService.edit, disparar um erro', () => {
      sinon.stub(productService, 'validateParamsId').resolves({});
      sinon.stub(productService, 'checkIfExists').resolves({});
      sinon.stub(productService, 'validateBodyAdd').resolves({});
      sinon.stub(productService, 'edit').rejects();
      return chai.expect(productController.editProduct({}, {})).to.eventually.be
        .rejected;
    });

    it('deve disparar um erro caso productService.getById, disparar um erro', () => {
      sinon.stub(productService, 'validateParamsId').resolves({});
      sinon.stub(productService, 'checkIfExists').resolves({});
      sinon.stub(productService, 'validateBodyAdd').resolves({});
      sinon.stub(productService, 'edit').resolves();
      sinon.stub(productService, 'getById').rejects();
      return chai.expect(productController.editProduct({}, {})).to.eventually.be
        .rejected;
    });

    it('deve chamar o res.status com 200 e o res.json', async () => {
      sinon.stub(productService, 'validateParamsId').resolves();
      sinon.stub(productService, 'checkIfExists').resolves({});
      sinon.stub(productService, 'validateBodyAdd').resolves({});
      sinon.stub(productService, 'edit').resolves();
      sinon.stub(productService, 'getById').resolves({});
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      await productController.editProduct({ params: { id: 1 } }, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({});
    });
  });

  describe('addProduct', () => {
    it('deve disparar um erro caso productService.validateBodyAdd dispare', () => {
      sinon.stub(productService, 'validateBodyAdd').rejects({});
      return chai.expect(productController.editProduct({}, {})).to.eventually.be
        .rejected;
    });
    it('deve disparar um erro caso productService.add dispare', () => {
      sinon.stub(productService, 'validateBodyAdd').resolves({});
      sinon.stub(productService, 'add').rejects({});
      return chai.expect(productController.addProduct({}, {})).to.eventually.be
        .rejected;
    });

    it('deve disparar um erro caso productService.getById, disparar um erro', () => {
      sinon.stub(productService, 'validateBodyAdd').resolves({});
      sinon.stub(productService, 'add').resolves({});
      sinon.stub(productService, 'getById').rejects();
      return chai.expect(productController.addProduct({}, {})).to.eventually.be
        .rejected;
    });

    it('deve chamar o res.status com 201 e o res.json', async () => {
      sinon.stub(productService, 'validateBodyAdd').resolves({ id: 1 });
      sinon.stub(productService, 'add').resolves({});
      sinon.stub(productService, 'getById').resolves({});
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      await productController.addProduct({}, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(201);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({});
    });
  });

  describe('deleteProduct', () => {
    it('deve disparar um erro caso productService.validateParamsId dispare', () => {
      sinon.stub(productService, 'validateParamsId').rejects({});
      return chai.expect(productController.deleteProduct({}, {})).to.eventually
        .be.rejected;
    });
    it('deve disparar um erro caso productService.checkIfExists dispare', () => {
      sinon.stub(productService, 'validateParamsId').resolves({});
      sinon.stub(productService, 'checkIfExists').rejects({});
      return chai.expect(productController.deleteProduct({}, {})).to.eventually
        .be.rejected;
    });

    it('deve disparar um erro caso productService.delete, disparar um erro', () => {
      sinon.stub(productService, 'validateParamsId').resolves({});
      sinon.stub(productService, 'checkIfExists').resolves({});
      sinon.stub(productService, 'delete').rejects({});
      return chai.expect(productController.deleteProduct({}, {})).to.eventually
        .be.rejected;
    });

    it('deve chamar o res.status com 201 e o res.json', async () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'checkIfExists').resolves();
      sinon.stub(productService, 'delete').resolves();
      const res = {
        sendStatus: sinon.stub().callsFake(() => res),
      };
      await productController.deleteProduct({ params: { id: 1 } }, res);
      chai.expect(res.sendStatusS.getCall(0).args[0]).to.equal(204);
    });
  });
});

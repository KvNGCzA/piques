import expect from 'expect';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';


chai.use(chaiHttp);
const { request } = chai;

describe('test test', () => {
  it('dfa', () => {
    request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body.message).toEqual('server up');
      });
  });
});

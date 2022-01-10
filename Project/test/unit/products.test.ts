import { createProduct } from "../../src/controllers/products";
import { Product } from "../../src/models/product";
import httpMocks from "node-mocks-http";
import newProduct from "../data/new-product.json";

// Model mock 함수
// 어떤 것에 의해서 호출되었는지 / 어떤 것과 함께 호출되는지 알 수 있습니다. ( 스파이 역할 )
jest.mock("../../src/models/product");

let req: any, res: any, next: any;
// beforeEach() 때문에 모든 테스트 케이스에 똑같이 적용
beforeEach(() => {
  // express controller가 받을 수 있는 인자 생성
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("Product Controller Create", () => {
  beforeEach(() => {
    // req.body에 따로 생성한 json data를 넣어줍니다.
    // beforeEach() 때문에 같은 그룹 모든 케이스에게 똑같이 적용
    req.body = newProduct;
  });

  it("should have a createProduct function", () => {
    // Product Create 함수 존재 유무 판단
    expect(typeof createProduct).toBe("function");
  });

  it("should call ProductModel", async () => {
    // createProduct() 함수가 실행 될 때
    await createProduct(req, res, next);
    // 내부에서 new Product()가 실행 되는지
    // 여기서 단위테스트 이기 때문에 실제 Model에 영향을 받으면 안되기 떄문에 Mock 함수 사용
    // toBeCalledWith 함수를 통해 어떤 인자를 받았는지도 함께 검증
    expect(Product).toBeCalledWith(newProduct);

    // productModel.save 메소드 검증
    const productModel = new Product(newProduct);
    expect(productModel.save).toBeCalled();
  });

  it("should return 201 response code", async () => {
    await createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    // res.send() Test
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", async () => {
    const productModel = new Product(newProduct);
    // mock 함수에 리턴값을 req.body 값으로 설정
    (productModel.save as jest.Mock).mockReturnValue(newProduct);

    await createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });

  it("should handle errors", async () => {
    // description 프로퍼티가 없을 때 발생하는 에러 메시지 정의
    const errorMessage = { message: "description property missing" };
    // 비동기 처리에서 에러 프로미스 정의
    const rejectedPromise = Promise.reject(errorMessage);
    const productModel = new Product(newProduct);

    // mock 함수의 리턴 값을 정의 => rejectedPromise 반환
    (productModel.save as jest.Mock).mockReturnValue(rejectedPromise);

    // product create 함수 호출
    await createProduct(req, res, next);

    // 테스트: productController.createProduct() 함수에서 에러가 발생해서  next() 함수를 호출
    // next 함수를 호출할 때 errorMessage가 넘어가는지 확인하는 테스트
    expect(next).toBeCalledWith(errorMessage);
  });
});

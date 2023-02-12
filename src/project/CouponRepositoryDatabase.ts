import pgPromise from "pg-promise";
import CouponRepository from "./CouponRepository";

export default class CouponRepositoryDatabase implements CouponRepository {
    async getCoupon (code: string): Promise<any> {
        const connection = pgPromise()("postgres://default:secret@localhost:5432/branas");
        const [couponData] = await connection.query("select * from cccat10.coupon where code = $1", [code]);
        await connection.$pool.end();
        return couponData;
    }
}

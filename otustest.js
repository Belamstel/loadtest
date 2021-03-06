import { check, group, sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://test.k6.io';

export default function () {
    group("get_base", function () { get_base() });
    group("get_contacts", function () { get_contacts() });

}

export function get_base() {
    let res = http.get(BASE_URL);
    console.log(`${BASE_URL}`);

    check(res, {
        "response code was 200": (res) => res.status == 200});
}

export function get_contacts() {
    let res = http.get(BASE_URL + '/contacts.php');
   // console.log("get_contacts");
   // console.log(res.body);
    let res_html_model_script = res.html().find('title').text();
    console.log(res_html_model_script);

    check(res, {
        "response code was 200": (res) => res.status == 200,
        "body size was 1234 bytes": (res) => res.body.length == 1234,});

}

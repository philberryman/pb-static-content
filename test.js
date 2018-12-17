const request = require("supertest");
const app = require("./app");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var fs = require("fs");
const showdown = require("showdown"),
  converter = new showdown.Converter();

function readFile(filePath) {
  const options = { encoding: "utf-8", flag: "r" };
  const buffer = fs.readFileSync(filePath, options);
  return buffer;
}

describe("Valid paths return 200 status", () => {
  test("About", done => {
    request(app)
      .get("/about-page")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test("Jobs", done => {
    request(app)
      .get("/jobs")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test("Valves", done => {
    request(app)
      .get("/valves")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Veryify body html is from relevant index.md", () => {
  test("About", done => {
    const page = "about-page";
    request(app)
      .get(`/${page}`)
      .then(response => {
        const bodyFromMarkdown = converter.makeHtml(
          readFile(`./content/${page}/index.md`)
        );
        var dom = new JSDOM(response.text);
        const bodyFromResponse = dom.window.document.querySelector("body")
          .innerHTML;
        expect(bodyFromResponse.replace(/\s/g, "")).toEqual(
          bodyFromMarkdown.replace(/\s/g, "")
        );
        done();
      });
  });
  test("Jobs", done => {
    const page = "jobs";
    request(app)
      .get(`/${page}`)
      .then(response => {
        const bodyFromMarkdown = converter.makeHtml(
          readFile(`./content/${page}/index.md`)
        );
        var dom = new JSDOM(response.text);
        const bodyFromResponse = dom.window.document.querySelector("body")
          .innerHTML;
        expect(bodyFromResponse.replace(/\s/g, "")).toEqual(
          bodyFromMarkdown.replace(/\s/g, "")
        );
        done();
      });
  });
  test("Valves", done => {
    const page = "valves";
    request(app)
      .get(`/${page}`)
      .then(response => {
        const bodyFromMarkdown = converter.makeHtml(
          readFile(`./content/${page}/index.md`)
        );
        var dom = new JSDOM(response.text);
        const bodyFromResponse = dom.window.document.querySelector("body")
          .innerHTML;
        expect(bodyFromResponse.replace(/\s/g, "")).toEqual(
          bodyFromMarkdown.replace(/\s/g, "")
        );
        done();
      });
  });
});

describe("Non matching paths return 404", () => {
  test("Careers page (does not exist)", done => {
    request(app)
      .get("/careers")
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});

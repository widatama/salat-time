import tape from "tape";

tape("Some tests", function(assert) {
  assert.plan(1);

  setTimeout(() => assert.pass(123), 5000);
});

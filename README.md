# SST Tester

Stack to recreate issues observed with permissions

## Recreation Steps

```
AWS_PROFILE=<local-profile> yarn deploy
```

Navigate to URL, expect success when you should get a failure response bue to permissions violation

Assert:

```
{"message":"Internal Server Error"}
```

```
AWS_PROFILE=<local-profile> yarn start
```

Navigate to URL, expect success when you should get a failure response bue to permissions violation

Assert:

```
{"$metadata":{"httpStatusCode":200,"requestId":"IURPV5J5NMCEASEN98PU8KMBVRVV4KQNSO5AEMVJF66Q9ASUAAJG","attempts":1,"totalRetryDelay":0},"Item":{"data":{"exists":false},"userId":"example-user-id","noteId":"example-note-id"}}
```

# Stop Forum Spam Checker

## About the project

This is a userscript, used with TamperMonkey or GreaseMonkey, for those with elevated access to view user IPs on WordPress.org support forums to check them against the [Stop Forum Spam](https://www.stopforumspam.com/) (SFS) service if there's suspicion of misbehavior.

When a user IP is detected, a button is provided to `Check IP`, it performs and API request to the SFS service, and based on the result let's you know an address has one of three states:

- OK
- TOR Proxy
- Misused (shows the report count, and when the last report was made)

The misused state provides the counts and the date as IPs can be dynamic or shared, so there are nuances and it is expected that anyone with this access knows to look beyond just the raw response to make a responsible decision.

## Installation

To install, open `/src/stop-forum-spam-checker.user.js` and hit the Raw button. TamperMonkey or GreaseMonkey will take over from there.

## Contributing

Contributions are welcome, bugreports, suggestions and even pull requests! No limitations, shoot for the stars!

The project uses no fancy build procedures, it's all JavaScript and the source is in the `src/` directory

# Final Project

20 points

**DUE: Wednesday, March 13 by 5:00pm**

This assignment is intended as a full summary of everything you've
learned in this course.  Some research might be required.

For easiest viewing of these instructions, view online on Github.com or use a Markdown previewer.

You do NOT need to download this repository.

### Getting Started

2. Create a remote repository (GitHub or BitBucket) called `mpscs52553-fp`.
2. Follow the instructions below.
3. Commit often.  Push often.
4. Add collaborators:
    * GitHub: jahnagoldman, ekxue, jeffcohen
    * BitBucket: jahnamcnamara, ekxue, jeffcohen
5. Make sure your final commit is timestamped before the deadline, and everything is pushed to your remote repository by the deadline.


### Requirements

Your goal is to build a simple stock portfolio management application
as a web-based SPA (single-page app).

* **You are responsible for designing the entire user interface**. It does
  not need to be complicated, but it should offer a clean design,
  be easy to use, and work on most mobile devices.

* You can use React, jQuery, pure JavaScript, or anything in between.

* You can use Bootstrap, another CSS framework, or write your own CSS.

* **Somewhat miraculously**, [IEX Group](https://iextrading.com/developer/) offers
  a free API to get near-real time stock quotes and information, historical
  data, and more.  You can use this API as your primary source of data.

* Your application should let the user perform the following tasks:
  * Keep track of their stock portfolio.  For each stock, the user should
    be able to enter the:
    * Stock symbol (IBM, MSFT, AMZN, etc.)
    * Number of shares owned.
  * The user should be able to see their current portfolio at a glance,
    including the symbol, number of shares, current market price per share,
    and stock value (number of shares multiplied by current market price).
  * The user should be able to sort the portfolio by symbol, number of shares,
    or stock value; and in either ascending or descending order (i.e.
    clicking the same column twice should toggle the sort order).
  * The user should be able to buy (add) more shares of a stock
  * The user should be able to sell (substract) shares of a stock
  * The user should see their total portfolio value (the sum of all stock values).

* The user should be able to close the site and then reopen it,
  and **all data should be preserved**. Your application should persist the
  portfolio data using HTML5 Local Storage or
  some kind of cloud-based storage (i.e. Firebase, AirTable, etc).
  This is the primary research item for this project, and will test
  how well you've "learned how to learn" web development topics on your
  own.

### Grading Rubric

20 points total

* 15 points for functionality
  * **5 pts:** Buy and sell shares
  * **5 pts:** Display sortable portfolio, including total portfolio value
  * **5 pts:** Persist portfolio data
* 5 points for design
  * **3 pts:** Clear, usable design
  * **2 pts:** Mobile layout on typical mobile phone resolutions
# mpscs52553-fp

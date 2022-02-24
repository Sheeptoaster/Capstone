# For All The Marbles 
For All The Marbles is a clone of [Robinhood](https://robinhood.com/) where user's are able to invest in a pretend stock market.

## Getting Started
To get use this project you can view the application at the live site [Will Insert Site Link When Deployed] and create an account, or test it out using the demo user.

This application can also be downloaded locally and run by:
  1. Clone the repository with `git clone git@github.com:Sheeptoaster/Capstone.git` or `git clone https://github.com/Sheeptoaster/Capstone.git`
  2. `cd /python-project` and install the required dependencies with `pipenv install`
  3. `cd /react-app` and install required dependencies with `npm install`
  4. In the `/python-project` directory follow the format in the .env.example to create your own .env file.
  5. Create your user and database in PostgreSQL
  
    `psql -c "CREATE USER <username> WITH PASSWORD '<password>' CREATEDB"`
  
    `psql -c "CREATE DATABASE <databaseName> WITH OWNER <username>"`
  
  6. In the `/python-project` directory start the python virtual environment with `pipenv shell`
  7. In the virtual environment run the following
  
    `flask db upgrade`
  
    `flask db migrate`
  
    `flask db seed all`
  
    `flask run`
  
  8. `cd /react-app` and start the application with `npm start`
  
  ## Technologies Used
  
  ### Frontend Technologies

  JavaScript
  
  React

  CSS3
  
  React-ChartJS
  
  ### Backend Technologies

  Flask
  
  PostgreSQL
  
  SQLAlchemy
  
  
  
  ## Features
  
  ## Home Page View
  ![image](https://user-images.githubusercontent.com/85136034/155236336-413ca288-c22f-43d1-bcca-f06f9d78a643.png)
  
  Chart View for Each Stock
  ![image](https://user-images.githubusercontent.com/85136034/155237153-11bf8929-714c-43af-909d-d95a4b33c962.png)

  Sidebar Navigation
  ![image](https://user-images.githubusercontent.com/85136034/155236471-99e5b51b-3d00-4d4e-b262-ef54111ef773.png)
  
  Buy, Sell, and Add to Watchlist From Homepage 
  ![image](https://user-images.githubusercontent.com/85136034/155237039-2f877404-be42-403c-a50b-340b5e0f9a8c.png)


  ## User Page
  
  Portfolio View
  ![image](https://user-images.githubusercontent.com/85136034/155237237-c1577be6-9d52-4388-acd1-32e1788eaa24.png)
  
  User Information Page
  ![image](https://user-images.githubusercontent.com/85136034/155236556-b6fd4cae-aaea-4399-93ab-ddb82cd8e48f.png)
  
  Edit User Information Page
 ![image](https://user-images.githubusercontent.com/85136034/155476805-51f364e8-4407-445f-bee3-e494de8cbca2.png)

  Transaction List
  ![image](https://user-images.githubusercontent.com/85136034/155236628-810f59f3-3ee0-47f5-85e2-0ceb1dd22b84.png)
  
  Buy and Sell From Portfolio
  ![image](https://user-images.githubusercontent.com/85136034/155237355-57bf542b-cac6-4837-a863-4995033b8758.png)

  View Watchlist and Change Alert Price Value
  ![image](https://user-images.githubusercontent.com/85136034/155237424-0c8a8f24-cad8-4035-a6e2-b9d64d28fbd1.png)

  Notifications When Stock Falls Under Alert Price
  ![image](https://user-images.githubusercontent.com/85136034/155237502-92666315-0822-4fba-970a-5183738d2fa2.png)

  Add Company Form
  ![image](https://user-images.githubusercontent.com/85136034/155476902-ce6f1c08-57f1-48fc-b098-24672e2669fa.png)

  Login And Signup Forms
  ![image](https://user-images.githubusercontent.com/85136034/155476961-2db2e7a2-cb96-40b9-9f63-cfe15225c1c3.png)
  ![image](https://user-images.githubusercontent.com/85136034/155476982-ed94090c-9fb0-40d9-a192-fa60753b7061.png)

  
  ## Updating Prices and Populating Graphs
  
 `@stock_routes.route('/')
def price_data():
    res = {}
    stocks = Stock.query.all()
    for stock in stocks:
        price_change(stock)
    for stock in stocks:
        res[stock.id] = stock.to_dict()
    db.session.remove()
    return res`
 
 `def price_change(stock):
    # Creates Random Dec Between 0 and 1
    change = Decimal(random())

    # If stock's weight is less than change
    # Stock Weight Increases + Stock Value Increase
    if stock.weight < change - Decimal(0.01):
        stock.price = (stock.price * (change * Decimal(3.25) /
                       Decimal(100))) + stock.price
        stock.weight = stock.weight + (stock.weight * (change / Decimal(6.75)))
        db.session.commit()
    # If Stock's weight is greater than change
    # Stock Weight Decreases + Stock Value Decreases
    else:
        stock.price = (stock.price * (change * Decimal(3.45) /
                       Decimal(100) * Decimal(-1))) + stock.price
        stock.weight = stock.weight - (stock.weight * (change / Decimal(6.75)))
        db.session.commit()

    # Sends Updated Stock to Be Catalogged
    data(stock)`
    
    `def data(stock):
    # Posts Price Data Point to PriceHistory Table
    post_price_data(stock)
    # Removes Data from PriceHistory Table if more than 500 entries with that stockId exist
    purge_price_data(stock)`
    
    `def post_price_data(stock):
    price_point = PriceHistory(
        stockId=stock.id,
        price=stock.price,
        time=time(),
        interval="60 Seconds"
    )

    db.session.add(price_point)
    db.session.commit()
    return price_point


def purge_price_data(stock):
    data_point = PriceHistory.query.filter(
        stock.id == PriceHistory.stockId).all()
    if len(data_point) > 90:
        removed = PriceHistory.query.order_by(PriceHistory.id).filter(
            stock.id == PriceHistory.stockId).first()
        db.session.delete(removed)
        db.session.commit()
    return`

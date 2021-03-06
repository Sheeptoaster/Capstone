# For All The Marbles 
For All The Marbles is a clone of [Robinhood](https://robinhood.com/) where user's are able to invest in a pretend stock market.

## Getting Started
To get use this project you can view the application at the live site [For All The Marbles](https://capstone-fotm.herokuapp.com/) and create an account, or test it out using the demo user.

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
  ![image](https://user-images.githubusercontent.com/85136034/155801353-32367573-3192-469e-911b-9a0778efed9b.png)
  
  Chart View for Each Stock
  ![image](https://user-images.githubusercontent.com/85136034/155801441-4759e3a3-44ef-48ef-a6fd-1e25e3abd7d4.png)

  Sidebar Navigation
  ![image](https://user-images.githubusercontent.com/85136034/155801195-d0ab9844-78ca-4c26-909d-260b5a5f1e77.png)
  
  Buy, Sell, and Add to Watchlist From Homepage 
  ![image](https://user-images.githubusercontent.com/85136034/155801636-b7bd8ec7-f9f7-4130-aef6-383c29193d0c.png)
  
  Add Stocks To Watchlist and Set Price Alert
  ![image](https://user-images.githubusercontent.com/85136034/155801854-66edba5e-879b-4f07-a450-125113c41439.png)



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
  ![image](https://user-images.githubusercontent.com/85136034/155801706-e77ade01-afd3-4cb6-8c80-82caece8792b.png)

  View Watchlist and Change Alert Price Value
  ![image](https://user-images.githubusercontent.com/85136034/155237424-0c8a8f24-cad8-4035-a6e2-b9d64d28fbd1.png)

  Notifications When Stock Falls Under Alert Price
  ![image](https://user-images.githubusercontent.com/85136034/155801275-4aef48ba-4edc-47e9-a3a3-984d5542103f.png)

  Add Company Form
  ![image](https://user-images.githubusercontent.com/85136034/155476902-ce6f1c08-57f1-48fc-b098-24672e2669fa.png)

  Login And Signup Forms
  ![image](https://user-images.githubusercontent.com/85136034/155800896-cb6b0233-eff1-4dad-8c2a-a89d94eb7b93.png)
  ![image](https://user-images.githubusercontent.com/85136034/155800929-58115150-e144-47be-a6f4-02bda0f985c8.png)
  ![image](https://user-images.githubusercontent.com/85136034/155800976-41d126c3-bb31-426b-b938-a6a6f8e70979.png)

  
  ## Updating Prices and Populating Graphs
  
 ```
 @stock_routes.route('/')
def price_data():
    res = {}
    stocks = Stock.query.all()
    for stock in stocks:
        price_change(stock)
    for stock in stocks:
        res[stock.id] = stock.to_dict()
    db.session.remove()
    return res
```
```
def price_change(stock):
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
  data(stock)
```  
```
  def data(stock):
    # Posts Price Data Point to PriceHistory Table
    post_price_data(stock)
    # Removes Data from PriceHistory Table if more than 500 entries with that stockId exist
    purge_price_data(stock)

  def post_price_data(stock):
    price_point = PriceHistory(
      stockId=stock.id,
      price=stock.price,
      time=time(),
      interval="60 Seconds"
  )

  db.session.add(price_point)
  db.session.commit()
  return price_point
```
```
def purge_price_data(stock):
    data_point = PriceHistory.query.filter(
        stock.id == PriceHistory.stockId).all()
    if len(data_point) > 90:
        removed = PriceHistory.query.order_by(PriceHistory.id).filter(
            stock.id == PriceHistory.stockId).first()
        db.session.delete(removed)
        db.session.commit()
    return
```

# Planned Features

### Auto Buy / Auto Sell At Price Point

### Price Alert For Price Increase


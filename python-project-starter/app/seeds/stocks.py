from app.models import db, Stock

def seed_stocks():
    amd = Stock(
        name="Advanced Mico Devices", ticker="AMD", price=120.98, weight=0.5
    )
    apple = Stock(
        name="Apple", ticker="AAPL", price=171.15, weight=0.5
    )
    microsoft = Stock(
        name="Microsoft", ticker="MSFT", price=298.11, weight=0.5
    )
    google = Stock(
        name="Google", ticker="GOOGL", price=2723.67, weight=0.5
    )
    goldman = Stock(
        name="Goldman Sacks", ticker="GS", price=363.48, weight=0.5
    )
    exxon = Stock(
        name="Exxon Mobil", ticker="XOM", price=77.93, weight=0.5
    )
    td = Stock(
        name="TD Bank", ticker="TD", price=84.13, weight=0.5
    )
    nvda = Stock(
        name="Nvidia", ticker="NVDA", price=262.69, weight=0.5
    )
    uber = Stock(
        name="Uber", ticker="UBER", price=36.57, weight=0.5
    )
    amc = Stock(
        name="AMC Entertainment", ticker="AMC", price=18.58, weight=0.5
    )
    ibm = Stock(
        name="IBM Common Stock", ticker="IBM", price=130.22, weight=0.5
    )
    verizon = Stock(
        name="Verizon", ticker="VZ", price=53.55, weight=0.5
    )
    att = Stock(
        name="ATT", ticker="T", price=24.44, weight=0.5
    )
    tesla = Stock(
        name="Tesla", ticker="TSLA", price=917.20, weight=0.5
    )
    znga = Stock(
        name="Zynga Inc", ticker="ZNGA", price=9.04, weight=0.5
    )
    ford = Stock(
        name="Ford Motor Company", ticker="F", price=18.06, weight=0.5
    )
    ge = Stock(
        name="General Electric", ticker="GE", price=101.33, weight=0.5
    )
    aal = Stock(
        name="American Airlines", ticker="AAL", price=18.69, weight=0.5
    )
    db.session.add(amd)
    db.session.add(apple)
    db.session.add(aal)
    db.session.add(ge)
    db.session.add(ford)
    db.session.add(znga)
    db.session.add(tesla)
    db.session.add(goldman)
    db.session.add(ibm)
    db.session.add(td)
    db.session.add(verizon)
    db.session.add(att)
    db.session.add(microsoft)
    db.session.add(google)
    db.session.add(exxon)
    db.session.add(nvda)
    db.session.add(uber)
    db.session.add(amc)

    db.session.commit()


def undo_stocks():
    db.session.execute("TRUNCATE stocks RESTART IDENTITY CASCADE;")
    db.session.commit()


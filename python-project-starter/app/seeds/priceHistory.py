from app.models import db, PriceHistory

def seed_price_history():
    amd1 = PriceHistory(
        stockId=1, price=120.98, time=0, interval="60 Seconds"
    )
    apple1 = PriceHistory(
        stockId=2, price=171.15, time=0, interval="60 Seconds"
    )
    microsoft1 = PriceHistory(
        stockId=13, price=298.11, time=0, interval="60 Seconds"
    )
    google1 = PriceHistory(
        stockId=14, price=2723.67, time=0, interval="60 Seconds"
    )
    goldman1 = PriceHistory(
        stockId=8, price=363.48, time=0, interval="60 Seconds"
    )
    exxon1 = PriceHistory(
        stockId=15, price=77.93, time=0, interval="60 Seconds"
    )
    td1 = PriceHistory(
        stockId=10, price=84.13, time=0, interval="60 Seconds"
    )
    nvda1 = PriceHistory(
        stockId=16, price=262.69, time=0, interval="60 Seconds"
    )
    uber1 = PriceHistory(
        stockId=17, price=36.57, time=0, interval="60 Seconds"
    )
    amc1 = PriceHistory(
        stockId=18, price=18.58, time=0, interval="60 Seconds"
    )
    ibm1 = PriceHistory(
        stockId=9, price=130.22, time=0, interval="60 Seconds"
    )
    verizon1 = PriceHistory(
        stockId=11, price=53.55, time=0, interval="60 Seconds"
    )
    att1 = PriceHistory(
        stockId=12, price=24.44, time=0, interval="60 Seconds"
    )
    tesla1 = PriceHistory(
        stockId=7, price=917.20, time=0, interval="60 Seconds"
    )
    znga1 = PriceHistory(
        stockId=6, price=9.04, time=0, interval="60 Seconds"
    )
    ford1 = PriceHistory(
        stockId=5, price=18.06, time=0, interval="60 Seconds"
    )
    ge1 = PriceHistory(
        stockId=4, price=101.33, time=0, interval="60 Seconds"
    )
    aal1 = PriceHistory(
        stockId=3, price=18.69, time=0, interval="60 Seconds"
    )
    db.session.add(amd1)
    db.session.add(apple1)
    db.session.add(aal1)
    db.session.add(ge1)
    db.session.add(ford1)
    db.session.add(znga1)
    db.session.add(tesla1)
    db.session.add(goldman1)
    db.session.add(ibm1)
    db.session.add(td1)
    db.session.add(verizon1)
    db.session.add(att1)
    db.session.add(microsoft1)
    db.session.add(google1)
    db.session.add(exxon1)
    db.session.add(nvda1)
    db.session.add(uber1)
    db.session.add(amc1)

    db.session.commit()


def undo_price_history():
    db.session.execute("TRUNCATE stocks RESTART IDENTITY CASCADE;")
    db.session.commit()

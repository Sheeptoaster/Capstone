from app.models import db, PriceHistory


def seed_history():
    amd = PriceHistory(
        name="Advanced Micro Devices", stockId=1, price=120.98, time=0, interval="60 Seconds"
    )
    apple = PriceHistory(
        name="Apple", stockId=2, price=171.15, time=0, interval="60 Seconds"
    )
    microsoft = PriceHistory(
        name="Microsoft", stockId=13, price=298.11, time=0, interval="60 Seconds"
    )
    google = PriceHistory(
        name="Google", stockId=14, price=2723.67, time=0, interval="60 Seconds"
    )
    goldman = PriceHistory(
        name="Goldman Sacks", stockId=8, price=363.48, time=0, interval="60 Seconds"
    )
    exxon = PriceHistory(
        name="Exxon Mobil", stockId=15, price=77.93, time=0, interval="60 Seconds"
    )
    td = PriceHistory(
        name="TD Bank", stockId=10, price=84.13, time=0, interval="60 Seconds"
    )
    nvda = PriceHistory(
        name="Nvidia", stockId=16, price=262.69, time=0, interval="60 Seconds"
    )
    uber = PriceHistory(
        name="Uber", stockId=17, price=36.57, time=0, interval="60 Seconds"
    )
    amc = PriceHistory(
        name="AMC Entertainment", stockId=18, price=18.58, time=0, interval="60 Seconds"
    )
    ibm = PriceHistory(
        name="IBM Common Stock", stockId=9, price=130.22, time=0, interval="60 Seconds"
    )
    verizon = PriceHistory(
        name="Verizon", stockId=11, price=53.55, time=0, interval="60 Seconds"
    )
    att = PriceHistory(
        name="ATT", stockId=12, price=24.44, time=0, interval="60 Seconds"
    )
    tesla = PriceHistory(
        name="Tesla", stockId=7, price=917.20, time=0, interval="60 Seconds"
    )
    znga = PriceHistory(
        name="Zynga Inc", stockId=6, price=9.04, time=0, interval="60 Seconds"
    )
    ford = PriceHistory(
        name="Ford Motor Company", stockId=5, price=18.06, time=0, interval="60 Seconds"
    )
    ge = PriceHistory(
        name="General Electric", stockId=4, price=101.33, time=0, interval="60 Seconds"
    )
    aal = PriceHistory(
        name="American Airlines", stockId=3, price=18.69, time=0, interval="60 Seconds"
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


def undo_history():
    db.session.execute("TRUNCATE stocks RESTART IDENTITY CASCADE;")
    db.session.commit()

import React, {useEffect, useState} from 'react';
import './pnl.css';
const Pnl = () => {
    const [buy, setBuy] = useState(0);
    const [sell, setSell] = useState(0);
    const [lots, setLots] = useState(1);
    const [lotSize, setLotsSize] = useState(50);
    const [capital , setCapital] = useState(0);

    const [turnover, setTurnover] = useState();
    const [sttTotal, setSttTotal] = useState();
    const [etc, setEtc] = useState();
    const [stax, setStax] = useState(0);
    const [cc, setCc] = useState(0);
    const [sebiCharges, setSebiCharges] = useState();
    const [stampCharges, setStampCharges] = useState();
    const [totalTax, setTotalTax] = useState();
    const [breakeven, setBreakeven] = useState();
    const [netProfit, setNetProfit] = useState();
    const [brokerage, setBrokerage] = useState(40);
    const [netpnl, setNetpnl] = useState(0);

    var stampChargesC = Math.round(parseFloat(parseFloat(parseFloat(buy) * parseFloat(lots*lotSize) * 0.00003).toFixed(2)))
    var turnoverC = parseFloat((parseFloat(buy) + parseFloat(sell)) * (parseFloat(parseFloat(lots * lotSize).toFixed(2)))).toFixed(2);
    var sttTotalC = Math.round(parseFloat(parseFloat(parseFloat(sell) * parseFloat(parseFloat(lots * lotSize).toFixed(2))) * 0.000625).toFixed(2));
    var etcC = parseFloat(parseFloat(0.0005 * parseFloat(turnover)).toFixed(2));
    var gstC = parseFloat(parseFloat(0.18 * (parseFloat(brokerage) + parseFloat(parseFloat(parseFloat(0.0005 * parseFloat(turnover)).toFixed(2))))).toFixed(2));
    var sebiChargesC = parseFloat(parseFloat(parseFloat(parseFloat((parseFloat((parseFloat(buy) + parseFloat(sell)) * (parseFloat(parseFloat(lots * lotSize).toFixed(2)))).toFixed(2)) * 0.000001).toFixed(2)) + (parseFloat(parseFloat((parseFloat((parseFloat(buy) + parseFloat(sell)) * (parseFloat(parseFloat(lots * lotSize).toFixed(2)))).toFixed(2)) * 0.000001).toFixed(2)) * 0.18)).toFixed(2));
    var staxC = parseFloat(parseFloat(0.18 * (parseFloat(brokerage) + etcC)).toFixed(2));
    var totalTaxC = parseFloat(parseFloat(brokerage + sttTotalC + etcC + staxC + sebiChargesC + stampChargesC).toFixed(2));
    var breakevenC = parseFloat(parseFloat(totalTaxC / parseFloat(lots*lotSize)).toFixed(2));
    var netPnlC = parseFloat(parseFloat(((sell - buy) * parseFloat(lots*lotSize)) - totalTaxC).toFixed(2));


    useEffect(() => {
        calculator_options();
    },[buy,sell,lots,lotSize]);

    function netPnlClassCss (){
        if (netPnlC >= 0) {
            return "pnlClassGreen";
        }else return "pnlClassRed";
    }

    const handleIncrementBuy = () => {
        const updatedBuy = parseInt(buy) + 1;
        setBuy(updatedBuy);
        document.getElementById("buyvalueinput").value = updatedBuy;
    };

    const handleDecrementBuy = () => {
        if (parseInt(buy) > 0) {
            const updatedBuy = parseInt(buy) - 1;
            setBuy(updatedBuy);
            document.getElementById("buyvalueinput").value = updatedBuy;

        }
    };

    const handleIncrementSell = () => {
        const updatedSell = parseInt(sell) + 1;
        setSell(updatedSell);
        document.getElementById("sellvalueinput").value = updatedSell;
    };

    const handleDecrementSell = () => {
        if (parseInt(sell) > 0) {
            const updatedSell = parseInt(sell) - 1;
            setSell(updatedSell);
            document.getElementById("sellvalueinput").value = updatedSell;

        }
    };

    const handleIncrementLots = () => {
        const updatedLots = parseInt(lots) + 1;
        setLots(updatedLots);
        document.getElementById("lotsvalueinput").value = updatedLots;
    };

    const handleDecrementLots = () => {
        if (parseInt(lots) > 0) {
            const updatedLots = parseInt(lots) - 1;
            setLots(updatedLots);
            document.getElementById("lotsvalueinput").value = updatedLots;

        }
    };

    function calculator_options() {
        let bp,sp,qty,bse_tran_charge_buy,bse_tran_charge_sell;
        bp = parseFloat(parseFloat(buy).toFixed(2));
        sp = parseFloat(parseFloat(sell).toFixed(2));
        qty = parseFloat(parseFloat(lots*lotSize).toFixed(2));

        setTurnover(parseFloat((bp+sp)*qty).toFixed(2));
        setSttTotal(Math.round(parseFloat(parseFloat(sp * qty * 0.000625).toFixed(2))))
        setEtc(parseFloat(parseFloat(0.0005 * turnover).toFixed(2)));
        setStax(parseFloat(parseFloat(0.18 * (brokerage + etc)).toFixed(2)));
        var sebi_charges = parseFloat(parseFloat(turnover*0.000001).toFixed(2));
        setSebiCharges(parseFloat(sebi_charges + (sebi_charges * 0.18)).toFixed(2));
        setStampCharges(Math.round(parseFloat(parseFloat(bp * qty * 0.00003).toFixed(2))));
        setTotalTax(parseFloat(parseFloat(brokerage + sttTotal + etc + stax + sebi_charges + stampCharges).toFixed(2)));
        setBreakeven(parseFloat(parseFloat(totalTax / qty).toFixed(2)));

        setNetpnl(parseFloat(parseFloat(((sp - bp) * qty) - totalTax).toFixed(2)));
    }

    return (
        <div className="pnl">
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <div className="row g-3 align-items-center">
                            <div className="col-auto lot-size">
                                <select onChange={(event) => setLotsSize(event.target.value)} className="form-select"
                                        aria-label="Default select example">
                                    <option selected disabled>Lot Size</option>
                                    <option value="15">Bank Nifty</option>
                                    <option value="50">Nifty</option>
                                    <option value="10">Sensex</option>
                                    <option value="40">Fin Nifty</option>
                                    <option value="20">20</option>
                                    <option value="25">25</option>
                                    <option value="30">30</option>
                                    <option value="35">35</option>
                                    <option value="45">45</option>
                                    <option value="100">100</option>
                                    <option value="75">75</option>
                                </select>
                            </div>
                            <div className="col-auto">
                                <label>Lotsize: {lotSize}</label>
                            </div>
                            <div className="col-auto">
                                <label htmlFor="inputPassword6" className={netPnlClassCss()} >{netPnlC}</label>
                            </div>
                            <div className="col-auto">
                                <label htmlFor="inputPassword6" className="col ">Capital</label>
                            </div>
                            <div className="col-auto">
                                <input type="number" onChange={(event) => setCapital(event.target.value)}
                                       className="form-control"/>
                            </div>
                        </div>
                        <br/>
                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label htmlFor="inputPassword6" className="col buttonBuy">BUY</label>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-light" onClick={handleIncrementBuy}>+</button>
                            </div>
                            <div className="col-auto">
                                <input type="number" onChange={(event) => setBuy(event.target.value)}
                                       id="buyvalueinput" className="form-control"
                                       aria-labelledby="passwordHelpInline"/>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-light" onClick={handleDecrementBuy}>-</button>
                            </div>
                            <div className="col-auto">
                                <label htmlFor="inputPassword6"
                                       className="col buttonBuy2">{buy * (lotSize * lots)}</label>
                            </div>
                            <div className="col-auto">
                            </div>
                        </div>
                        <br/>
                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label htmlFor="inputPassword6" className="col buttonSell">SELL</label>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-light" onClick={handleIncrementSell}>+</button>
                            </div>
                            <div className="col-auto">
                                <input type="number" onChange={(event) => setSell(event.target.value)}
                                       id="sellvalueinput" className="form-control"
                                       aria-labelledby="passwordHelpInline"/>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-light" onClick={handleDecrementSell}>-</button>
                            </div>
                            <div className="col-auto">
                                <label htmlFor="inputPassword6"
                                       className="col buttonSell2">{sell * (lotSize * lots)}</label>
                            </div>
                            <div className="col-auto">
                            </div>
                        </div>
                        <br/>
                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label htmlFor="inputPassword6" className="col buttonLots">LOTS</label>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-light" onClick={handleIncrementLots}>+</button>
                            </div>
                            <div className="col-auto">
                                <input type="number" onChange={(event) => setLots(event.target.value)}
                                       id="lotsvalueinput" className="form-control"
                                       aria-labelledby="passwordHelpInline"/>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-light" onClick={handleDecrementLots}>-</button>
                            </div>
                            <div className="col-auto">
                                <label htmlFor="inputPassword6" className="col buttonLots2">{(lotSize * lots)}</label>
                            </div>
                            <div className="col-auto">
                            </div>
                        </div>
                        <br/>
                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <table className="table">
                                    <tbody>
                                    <tr>
                                        <td>1 lot price</td>
                                        <td>{parseFloat(buy) * parseFloat(lotSize)}</td>
                                    </tr>
                                    <tr>
                                        <td>Max lotsize</td>
                                        <td>{Math.floor(parseFloat(capital) / (parseFloat(buy) * parseFloat(lotSize)))}</td>
                                    </tr>
                                    <tr>
                                        <td>Max Premium</td>
                                        <td>{Math.floor(parseFloat(capital) / (parseFloat(lotSize)))}</td>
                                    </tr>
                                    <tr>
                                        <td>monthly income</td>
                                        <td>{Math.round(parseFloat(netPnlC) * 20)}</td>
                                    </tr>
                                    <tr>
                                        <td>daily income</td>
                                        <td>{Math.round((parseFloat(netPnlC) * 20)/30)}</td>
                                    </tr>
                                    <tr>
                                        <td>monthly income</td>
                                        <td>{(Math.round(parseFloat(netPnlC) * 20 * 12) / 100000).toFixed(1)} LPA</td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Net P&L</th>
                                <th className={netPnlClassCss()}>{netPnlC}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Turnover</td>
                                <td>{turnoverC}</td>
                            </tr>
                            <tr>
                                <td>Brokerage</td>
                                <td>{brokerage}</td>
                            </tr>
                            <tr>
                                <td>STT Total</td>
                                <td>{sttTotalC}</td>
                            </tr>
                            <tr>
                                <td>Exchange txn charge</td>
                                <td>{etcC}</td>
                            </tr>
                            <tr>
                                <td>Clearing charge</td>
                                <td>{cc}</td>
                            </tr>
                            <tr>
                                <td>GST</td>
                                <td>{gstC}</td>
                            </tr>
                            <tr>
                                <td>SEBI charges</td>
                                <td>{sebiChargesC}</td>
                            </tr>
                            <tr>
                                <td>Stamp duty</td>
                                <td>{stampChargesC}</td>
                            </tr>
                            <tr>
                                <td>Total tax and charges</td>
                                <td>{totalTaxC}</td>
                            </tr>
                            <tr>
                                <td>Points to breakeven</td>
                                <td>{breakevenC}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Pnl;
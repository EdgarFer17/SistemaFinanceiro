import BaseComponent from './components/BaseComponent.js';
import DonutChart from './components/DonutChart.js';
import BarChart from './components/BarChart.js';
import Report from './modal/Report.js';
import Filter from './components/Filter.js';
import TransactionTable from './components/TransactionTable.js';
import { DASHBOARD } from '../style_config.js';

export default class Dashboard extends BaseComponent {
    constructor() {
        const SCHEMA = {
            _tag: "main",
            title_wrapper: {
                _tag: "div",
                title: "h2",
                ope_wrapper: {
                    _tag: "div",
                    ope_report: "img",
                    ope_show: "img"
                }
            },
            status_wrapper: {
                _tag: "section",
                status_balance_wrapper: {
                    _tag: "div",
                    status_balance_title: "h3",
                    status_balance_currency: "p"
                },
                status_health_wrapper: {
                    _tag: "div",
                    status_health_title: "h3",
                    status_health_type: "p"
                }
            },
            donut_wrapper: {
                _tag: "section",
                donut_first_wrapper: {
                    _tag: "div",
                    donut_first_title: "h3",
                    donut_first_component: new DonutChart()
                },
                donut_second_wrapper: {
                    _tag: "div",
                    donut_second_title: "h3",
                    donut_second_wrapper2: {
                        _tag: "div",
                        donut_filter: new Filter(),
                        donut_second_component: new DonutChart()
                    }
                }
            },
            bar_wrapper: {
                _tag: "section",
                bar_title: "h3",
                bar_component: new BarChart(),
            },
            transaction_wrapper: {
                _tag: "section",
                transaction_title: "h3",
                transaction_component: new TransactionTable(),
            },
            report_component: new Report()
        }
        super(SCHEMA, DASHBOARD)
    }

    updateReportIcon(_path, _alt) {
        BaseComponent.updateImg(_path, _alt, this.elements.ope_report);
    }
    
    updateShowIcon(_path, _alt) {
        BaseComponent.updateImg(_path, _alt, this.elements.ope_show);
    }
    
    updateTitle(_text) {
        BaseComponent.updateText(_text, this.elements.title);
    }

    updateBarTitle(_text){
        BaseComponent.updateText(_text, this.elements.bar_title);
    }

    updateTransactionTitle(_text){
        BaseComponent.updateText(_text, this.elements.transaction_title);
    }
}
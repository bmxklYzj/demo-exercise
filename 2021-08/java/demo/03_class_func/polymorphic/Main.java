package polymorphic;

/**
 * 多态
 */
public class Main {
    public static void main(String[] args) {
        Income[] incomes = new Income[] {
                new Income(10000),
                new FreeLevelIncome(10000),
                new SpecialIncome(10000)
        };
        getTotal(incomes);
    }

    private static void getTotal(Income[] incomes) {
        double total = 0;
        for (Income income : incomes) {
            total += income.calcTax();
        }
        System.out.println(total);
    }
}

class Income {
    double income;

    public Income(double income) {
        this.income = income;
    }

    public double calcTax() {
        return income * 0.1;
    }
}

class FreeLevelIncome extends Income {
    public FreeLevelIncome(double income) {
        super(income);
    }

    @Override
    public double calcTax() {
        double freeLevel = 5000;
        if (income < freeLevel) {
            return 0;
        }
        return (income - freeLevel) * 0.1;
    }
}

class SpecialIncome extends Income {
    public SpecialIncome(double income) {
        super(income);
    }

    @Override
    public double calcTax() {
        return 0;
    }
}
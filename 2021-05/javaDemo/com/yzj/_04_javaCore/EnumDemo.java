package com.yzj._04_javaCore;

enum Color {
    Red, Blue, Green
}

enum WeekDay {
    Sun,
    Mon,
    Tue,
    Wed,
    Thu,
    Fri,
    Sat,
}

enum WeekDay2 {
    Sun(0, "星期日"),
    Mon(1, "星期一"),
    Tue(2, "星期二"),
    Wed(3, "星期三"),
    Thu(4, "星期四"),
    Fri(5, "星期五"),
    Sat(6, "星期六");

    private final int dayValue;
    private final String chinese;

    private WeekDay2(int dayValue, String chinese) {
        this.dayValue = dayValue;
        this.chinese = chinese;
    }

    @Override
    public String toString() {
        return this.chinese;
    }
}

public class EnumDemo {
    public static void main(String[] args) {
        System.out.println(Color.Blue.ordinal());

        WeekDay day = WeekDay.Sat;
        System.out.println(day); // Sat
        System.out.println(day.name()); // Sat
        System.out.println(day.toString()); // Sat
        System.out.println(day.ordinal()); // 6

        WeekDay2 day2 = WeekDay2.Sat;
        System.out.println(day2); // 星期六
        System.out.println(day2.name()); // Sat
        System.out.println(day2.toString()); // 星期六
        System.out.println(day2.ordinal()); // 6
    }
}

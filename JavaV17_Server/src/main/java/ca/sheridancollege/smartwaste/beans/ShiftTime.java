package ca.sheridancollege.smartwaste.beans;

public enum ShiftTime {
    MORNING("Morning"),
    AFTERNOON("Afternoon"),
    EVENING("Evening");

    private final String name;
    ShiftTime(String name){
        this.name = name;
    }
    public String getName(){
        return name; 
    }
}

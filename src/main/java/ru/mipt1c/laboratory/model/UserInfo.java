package ru.mipt1c.laboratory.model;

import ru.mipt1c.laboratory.db.dto.UserDto;

import java.util.Date;

public class UserInfo {

    private UserDto userDto;

    public UserInfo() {
        this.userDto = new UserDto();
    }

    public UserInfo(UserDto userDto) {
        this.userDto = userDto;
    }

    public Integer getId() {
        return userDto.getId();
    }

    public void setId(Integer id) {
        this.userDto.setId(id);
    }

    public String getFirstName() {
        return this.userDto.getFirstName();
    }

    public void setFirstName(String firstName) {
        this.userDto.setFirstName(firstName);
    }

    public String getLastName() {
        return this.userDto.getLastName();
    }

    public void setLastName(String lastName) {
        this.userDto.setLastName(lastName);
    }

    public String getEmail() {
        return this.userDto.getEmail();
    }

    public void setEmail(String email) {
        this.userDto.setEmail(email);
    }

    public Integer getRoleId() {
        return this.userDto.getRoleId();
    }

    public void setRoleId(Integer roleId) {
        this.userDto.setRoleId(roleId);
    }

    public Boolean getIsEnabled() {
        return this.userDto.getIsEnabled();
    }

    public void setIsEnabled(Boolean isEnabled) {
        this.userDto.setIsEnabled(isEnabled);
    }

    public Date getRegistrationDate() {
        return this.userDto.getRegistrationDate();
    }

    public void setRegistrationDate(Date registrationDate) {
        this.userDto.setRegistrationDate(registrationDate);
    }

    public UserDto fetchUserDto() {
        return userDto;
    }
}

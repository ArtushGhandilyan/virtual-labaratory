package ru.mipt1c.laboratory.utils;

import org.springframework.context.support.ReloadableResourceBundleMessageSource;

import java.util.Locale;

public class WildcardResourceBundleMessageSource extends ReloadableResourceBundleMessageSource {

    public WildcardResourceBundleMessageSource() {

    }

	public void setBasenames(String[] basenames)  {
	    super.setBasenames(basenames);
	}
	
	@Override
	protected String resolveCodeWithoutArguments(String code, Locale locale) {
	    return super.resolveCodeWithoutArguments(code, locale);
	}
}

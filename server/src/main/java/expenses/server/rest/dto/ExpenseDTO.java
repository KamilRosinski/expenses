package expenses.server.rest.dto;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Date;

@RequiredArgsConstructor
@Getter
public class ExpenseDTO {

	private final Long id;
	private final Date date;
	private final String description;
	private final Integer value;

}

package expenses.server.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CreateAccountingPeriodForYearMonthDTO {

	private final Integer year;

	private final Integer month;

}

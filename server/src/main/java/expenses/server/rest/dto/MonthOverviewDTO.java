package expenses.server.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MonthOverviewDTO {

	private final Long id;

	private final Integer year;

	private final Integer month;

	private final Long transactionCount;

	private final Long income;

	private final Long outcome;

}

package expenses.server.rest.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.YearMonth;

@RequiredArgsConstructor
@Getter
public class MonthOverviewDTO {

	private final YearMonth yearMonth;
	private final Integer income;
	private final Integer outcome;

}
